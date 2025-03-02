mendeleyWebImporter = {
    downloadPdfs(e, t) { return this._call('downloadPdfs', [e, t]); },
    open() { return this._call('open', []); },
    setLoginToken(e) { return this._call('setLoginToken', [e]); },
    _call(methodName, methodArgs) {
        const id = Math.random();
        window.postMessage({ id, token: '0.9739079369679529', methodName, methodArgs }, 'https://e-uczelnia.ath.bielsko.pl');
        return new Promise(resolve => {
            const listener = window.addEventListener('message', event => {
                const data = event.data;
                if (typeof data !== 'object' || !('result' in data) || data.id !== id) return;
                window.removeEventListener('message', listener);
                resolve(data.result);
            });
        });
    }
};