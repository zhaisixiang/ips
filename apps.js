/*
https://github.com/methol/myip
*/
const checkDomainAvailability = (url, timeout = 2666) => {
    return new Promise((resolve) => {
        const controller = new AbortController();
        const signal = controller.signal;

        // 设置超时定时器
        const timer = setTimeout(() => {
            controller.abort(); // 超时后中断请求
            resolve(false); // 认为域名不可访问
        }, timeout);

        fetch(url, { method: 'HEAD', signal })
            .then(response => {
                clearTimeout(timer); // 清除超时定时器
                if (response.ok) {
                    resolve(true); // 域名可访问
                } else {
                    resolve(false); // 域名不可访问
                }
            })
            .catch(() => {
                clearTimeout(timer); // 清除超时定时器
                resolve(false); // 请求出错，认为域名不可访问
            });
    });
};

const $$ = document;
let random = parseInt(Math.random() * 100000000);
let IP = {
        get: (url, type) => fetch(url, {
                method: 'GET'
            })
            .then((resp) => {
                if (type === 'text')
                    return Promise.all([resp.ok, resp.status, resp.text(), resp.headers]);
                else {
                    return Promise.all([resp.ok, resp.status, resp.json(), resp.headers]);
                }
            })
            .then(([ok, status, data, headers]) => {
                if (ok) {
                    let json = {
                        ok, status, data, headers
                    }
                    return json;
                } else {
                    throw new Error(JSON.stringify(json.error));
                }
            }).catch(error => {
                throw error;
            }),

    getJsonp: (url) => {
        var script = document.createElement('script');
        script.src = url
        document.head.appendChild(script);
    },
    parseIPIpapi: (ip, elID) => {
        IP.get(`https://api.wap.cloudns.org/?apid=3&ip=${ip}&z=${random}`, 'json')
            .then(resp => {
                $$.getElementById(elID).innerHTML = `${resp.data.country} ${resp.data.regionName} ${resp.data.city} ${resp.data.isp}`;
            })
    },
    parseIPqizhi: (ip, elID) => {
        IP.get(`https://api.wap.cloudns.org/?apid=3&ip=${ip}&z=${random}`, 'json')
            .then(resp => {
                $$.getElementById(elID).innerHTML = `${resp.data.myflag} `;
            })
    },
    parseIPspee: (ip, elID) => {
        IP.get(`https://forge.speedtest.cn/api/location/info?ip=${ip}&z=${random}`, 'json')
            .then(resp => {
                $$.getElementById(elID).innerHTML = `${resp.data.net_str} ${resp.data.province} ${resp.data.city} ${resp.data.distinct}`;
            })
    },

    getIpapiIP: () => {
        IP.get(`https://ipapi.co/json?z=${random}`, 'json')
            .then(resp => {
                $$.getElementById('ip-ipapi').innerHTML = resp.data.ip;
                IP.parseIPIpapi(resp.data.ip, 'ip-ipapi-geo');
                return resp.data.ip;
            })
            .then(ip => {
                IP.parseIPqizhi(ip, 'ip-ipapi-qizhi');
            })
    },
    getIpcha: () => {
        IP.get(`https://2023.ipchaxun.com/?z=${random}`, 'json')
            .then(resp => {
                $$.getElementById('ip-ipcha').innerHTML = resp.data.ip;
                IP.parseIPIpapi(resp.data.ip, 'ip-ipcha-geo');
                return resp.data.ip;
            })
            .then(ip => {
                IP.parseIPqizhi(ip, 'ip-ipcha-qizhi');
            })
    },
    getSPEE: () => {
        IP.get(`https://forge.speedtest.cn/api/location/info?z=${random}`, 'json')
            .then(resp => {
                $$.getElementById('ip-spee').innerHTML = resp.data.ip;
                IP.parseIPspee(resp.data.ip, 'ip-spee-geo');
                return resp.data.ip;
            })
            .then(ip => {
                IP.parseIPqizhi(ip, 'ip-spee-qizhi');
            })

    },

    getCNIP: () => {
        IP.get(`https://forge.speedtest.cn/api/location/info?z=${random}`, 'json')
            .then(resp => {
                $$.getElementById('ip-cnip').innerHTML = resp.data.ip;
                return resp.data.ip;
            })
            .then(ip => {
                IP.parseIPIpapi(ip, 'ip-cnip-geo');
                IP.parseIPqizhi(ip, 'ip-cnip-qizhi');
            })

    },
    getIPSB: () => {
        const ipv6URL = `https://api-ipv6.ip.sb/geoip?z=${random}`;
        const ipv4URL = `https://api.ip.sb/geoip?z=${random}`;
        checkDomainAvailability(ipv6URL)
            .then(isIPv6Available => {
                const selectedURL = isIPv6Available ? ipv6URL : ipv4URL;

                return IP.get(selectedURL, 'json')
                    .then(resp => {
                        $$.getElementById('ip-ipsb').innerHTML = resp.data.ip;
                        return resp.data.ip;
                    })
                    .then(ip => {
                        IP.parseIPIpapi(ip, 'ip-ipsb-geo');
                        IP.parseIPqizhi(ip, 'ip-ipsb-qizhi');
                    })
                    .catch(e => {
                        console.log('^_^好像出错咯～！');
                    });
            })
            .catch(e => {
                console.log('^_^好像出错咯～！');
            });
    },

    getINFO: () => {
        const ipv6URL = `https://ipinfo.io/json?&z=${random}`;
        const ipv4URL = `https://api-ipv6.ip.sb/geoip?z=${random}`;
        checkDomainAvailability(ipv6URL)
            .then(isIPv6Available => {
                const selectedURL = isIPv6Available ? ipv6URL : ipv4URL;

                return IP.get(selectedURL, 'json')
                    .then(resp => {
                        $$.getElementById('ip-info').innerHTML = resp.data.ip;
                        return resp.data.ip;
                    })
                    .then(ip => {
                        IP.parseIPIpapi(ip, 'ip-info-geo');
                        IP.parseIPqizhi(ip, 'ip-info-qizhi');
                    })
                    .catch(e => {
                        console.log('^_^好像出错咯～！');
                    });
            })
            .catch(e => {
                console.log('^_^好像出错咯～！');
            });
    },
    getIpify: () => {
        IP.get(`https://api64.ipify.org?format=json&z=${random}`, 'json')
            .then(resp => {
                $$.getElementById('ip-ipify').innerHTML = resp.data.ip;
                return resp.data.ip;
            })
            .then(ip => {
                IP.parseIPIpapi(ip, 'ip-ipify-geo');
                IP.parseIPqizhi(ip, 'ip-ipify-qizhi');
            })

    }
};
