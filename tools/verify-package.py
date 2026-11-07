import pathlib, struct, io, zipfile, hashlib, json, fnmatch
from cryptography.hazmat.primitives.serialization import load_der_public_key
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes
root=pathlib.Path(__file__).resolve().parents[2]
release_version=json.loads((root/'dzen-clean/manifest.json').read_text(encoding='utf-8'))['version']
raw=(root/f'dzen-clean-{release_version}.crx').read_bytes()
assert raw[:4]==b'Cr24';version,size=struct.unpack('<II',raw[4:12]);assert version==3
header=raw[12:12+size];archive=raw[12+size:];assert archive==(root/f'dzen-clean-{release_version}.zip').read_bytes()
def varint(data,pos):
    out=0;shift=0
    while True:
        b=data[pos];pos+=1;out|=(b&127)<<shift
        if not b&128:return out,pos
        shift+=7
def fields(data):
    pos=0;out={}
    while pos<len(data):
        tag,pos=varint(data,pos);assert tag&7==2
        length,pos=varint(data,pos);out[tag>>3]=data[pos:pos+length];pos+=length
    return out
h=fields(header);proof=fields(h[3]);signed=fields(h[10000]);assert hashlib.sha256(proof[1]).digest()[:16]==signed[1]
load_der_public_key(proof[1]).verify(proof[2],b'CRX3 SignedData\x00'+struct.pack('<I',len(h[10000]))+h[10000]+archive,ec.ECDSA(hashes.SHA256()))
id=''.join(chr(97+n) for b in signed[1] for n in (b>>4,b&15));assert id=='gbhpmimgahcdcjgppenpmllelainield'
for old_version in ['0.1.0','0.2.0','0.3.0']:
    old=(root/f'dzen-clean-{old_version}.crx').read_bytes();old_size=struct.unpack('<I',old[8:12])[0];assert fields(fields(old[12:12+old_size])[10000])[1]==signed[1]
with zipfile.ZipFile(io.BytesIO(archive)) as z:
    assert z.testzip() is None;names=z.namelist();assert len(names)==len(set(names))
    assert not any(n.lower().endswith(('.pem','.key','.crx','.zip')) or '/node_modules/' in '/'+n or n.startswith('_metadata/') for n in names)
    m=json.loads(z.read('manifest.json'));assert m['version']==release_version;assert m['minimum_chrome_version']=='121'
    references=[m['background']['service_worker'],m['action']['default_popup'],*m['icons'].values(),*[f for cs in m['content_scripts'] for f in cs['js']],*[r['path'] for r in m['declarative_net_request']['rule_resources']]]
    for item in references:assert item in names,item
    for war in m['web_accessible_resources']:
        for pattern in war['resources']:assert any(fnmatch.fnmatch(n,pattern) for n in names),pattern
    for name in names:assert z.read(name)==(root/'dzen-clean'/name).read_bytes(),name
    assert 'src/background-main.js' in names and 'LICENSE' in names and 'pnpm-lock.yaml' in names
    assert any(n.startswith('third-party/@adguard-api-mv3-3.0.0/') for n in names)
    assert 'data/source-files/adguard-filter-2.txt' in names
    count=len(names)
report={'version':release_version,'extensionId':id,'passed':True,'files':count,'zipBytes':len(archive),'checks':['ZIP CRC; every entry matches source','Manifest and WAR resources included','Independent CRX3 ECDSA signature','CRX ID unchanged from 0.1, 0.2 and 0.3','Source, filter origins, dependency licenses and lock included','No private signing key, node_modules or reference archives']}
(root/f'dzen-clean-{release_version}-package-check.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report,indent=2))
