export function commonPrefix(strs: string[]): string {

    let prevStr = strs[0];
    for(let str of strs) {
        if(str[0] !== prevStr[0]) {
            return "";
        }
        prevStr = str;
    }

    let prefix = strs[0];
    for(let str of strs) {
        
        if(str === "") {
            continue;
        }
        
        inner : for(let i = 0; i <= str.length; i++) {
            
            if(i === prefix.length) {
                break inner;
            }
            if( i === str.length) {
                prefix = str;
                break inner;
            }

            if(str[i] !== prefix[i]) {
                prefix = prefix.slice(0,i);
                break inner;
            }
        }
    }

    return prefix;
};