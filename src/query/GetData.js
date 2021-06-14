const getData = async (url) => {
        let result = await fetch(url);
        result = await result.json();
        return result;
};

export default getData