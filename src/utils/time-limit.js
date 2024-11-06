const getRemainingTime = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const timeDifference = end - now;

    if (timeDifference <= 0) {
        return 'habis';
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    if (days <= 0) {
        return `${hours} j ${minutes} m`
    } else if (hours <= 0) {
        return `${minutes} m`
    }

    return `${days} h ${hours} j`
}

export default getRemainingTime