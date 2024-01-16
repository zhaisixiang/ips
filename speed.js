let HTTP = {
    checker: (domain, cbElID) => {
        let img1 = new Image();
        let img2 = new Image();
        let startTime1, startTime2;
        let durations = [];

        let timeout1 = setTimeout(() => {
            img1.onerror = img1.onload = null;
            img1.src = '';
            handleResult('<span class="sk-text-error">连接超时');
        }, 6666);

        let timeout2;

        img1.onerror = () => {
            clearTimeout(timeout1);
            handleResult('<span class="sk-text-error">无法访问');
        }

        img1.onload = () => {
            clearTimeout(timeout1);
            startTime1 = new Date().getTime();
            img2.src = `https://${domain}/favicon.ico?${+(new Date())}`; // 发起第二次请求
            timeout2 = setTimeout(() => {
                img2.onerror = img2.onload = null;
                img2.src = '';
                handleResult('<span class="sk-text-error">连接超时');
            }, 6666);
        }

        img2.onerror = () => {
            clearTimeout(timeout2);
            handleResult('<span class="sk-text-error">无法访问');
        }

        img2.onload = () => {
            clearTimeout(timeout2);
            let endTime2 = new Date().getTime();
            startTime2 = endTime2;
            let duration2 = endTime2 - startTime1;
            durations.push(duration2);

            // 计算平均值
            let averageDuration = Math.floor(durations.reduce((sum, value) => sum + value, 0) / durations.length);

            if (averageDuration > 300) {
                handleResult(`<span class="sk-text-warning">${averageDuration} ms`);
            } else {
                handleResult(`<span class="sk-text-success">${averageDuration} ms`);
            }
        }

        img1.src = `https://${domain}/favicon.ico?${+(new Date())}`;

        function handleResult(message) {
            $$.getElementById(cbElID).innerHTML = `${message}</span>`;
        }
    },

    runcheck: () => {
        HTTP.checker('www.baidu.com', 'http-baidu');
        HTTP.checker('www.163.com', 'http-163');
        HTTP.checker('new.qq.com', 'http-qq');
        HTTP.checker('www.sina.com.cn', 'http-sina');
        HTTP.checker('www.tiktok.com', 'http-tiktok');
        HTTP.checker('www.netflix.com', 'http-netflix');
        HTTP.checker('twitter.com', 'http-twitter');
        HTTP.checker('www.facebook.com', 'http-facebook');
        HTTP.checker('www.google.com', 'http-google');
        HTTP.checker('chat.openai.com', 'http-openai');
        HTTP.checker('www.disney.com', 'http-disney');
        HTTP.checker('www.youtube.com', 'http-youtube');
    }
};
