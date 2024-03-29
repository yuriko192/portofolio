export function LocalstorageSet(key: string,value: string) :boolean{
    if (typeof localStorage === 'undefined'){
        return false
    }
    localStorage.setItem(key, value);
    return true;
}

export function LocalstorageGet(key: string): string | null {
    if (typeof localStorage === 'undefined') {
        return null;
    }
    return localStorage.getItem(key);
}