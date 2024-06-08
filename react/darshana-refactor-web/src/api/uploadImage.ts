// Upload files

export const uploadImage = async(file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    const token = localStorage.getItem('access_token') || '';
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API}/api/image`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: fd,
        });

        const dataJson = await resp.json();
        const { data, status }= dataJson;

        if(!status){
            return null;
        }

        return data;

          
    } catch (error) {
        console.error({error});
        return null;
    }
}
