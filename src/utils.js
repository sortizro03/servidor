import {dirname} from 'path'
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url))

const getFindIndex = (data, idToSearch) => {
    let f;
    const found = data.some(function(item, index) { f = index; return item.id == idToSearch; });

    if (!found) {
        return -1;
    }

    return f;
}

export {
    __dirname,
    getFindIndex
}
