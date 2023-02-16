    // Постинг данных
    const postData = async (url, data) => {

        // В переменной res мы получаем промис
        const res = await fetch(url, {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data // data - данные, которые будут постится
        });

        return await res.json(); // возвращаем проми с формате json
    };

    const getResource = async (url) => {

        // В переменной res мы получаем промис
        const res = await fetch(url);

        /** Здесь мы создаём ошибкуб если статус запроса неудачный */
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); // возвращаем промис в формате json
    };


    export {postData};
    export {getResource};