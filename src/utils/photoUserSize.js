const handleSizePhotoUser = (url, size) => {
    if (url.includes('googleusercontent.com')) {
        return url.replace(/=s\d+-c/, `=s${size}-c`);
    } else {
        return url
    }
}

export default handleSizePhotoUser