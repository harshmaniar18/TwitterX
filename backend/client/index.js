export class JSONPlaceholderClient {
    constructor() {
        this.url = 'https://jsonplaceholder.typicode.com'
    }

    async fetch(method, pathname, data = {}) {
        const url = this.url + pathname
        const body = Object.keys(data).length > 0 ? data : undefined
        const result = await fetch(url, { method, body }).then((response) => response.json())
        return result
    }
}

export const client = new JSONPlaceholderClient()
