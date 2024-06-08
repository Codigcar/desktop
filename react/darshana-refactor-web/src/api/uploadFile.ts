// Upload files
export interface IFile {
    status: boolean;
    data:   Data;
}

export interface Data {
    fieldname:            string;
    originalname:         string;
    encoding:             string;
    mimetype:             string;
    size:                 number;
    bucket:               string;
    key:                  string;
    acl:                  string;
    contentType:          string;
    contentDisposition:   null;
    contentEncoding:      null;
    storageClass:         string;
    serverSideEncryption: null;
    metadata:             null;
    location:             string;
    etag:                 string;
    versionId:            string;
}

export const uploadFile = async(file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API}/api/file`, {
            method: 'POST',
            body: fd,
        });

        const dataJson = await resp.json();
        const {data, status }= dataJson as IFile;

        if(!status){
            return null;
        }

        return data;

          
    } catch (error) {
        console.error({error});
        return null;
    }
}
