import db from "../models/index.js";



let handleGetAllStore = () => {

    return new Promise(async (resolve, reject) => {

        try {
            let storeList = db.Store.findAll()
            console.log("storeList", storeList);
            if (storeList) {
                resolve({
                    errCode: 0,
                    errMessage: "Get List Store Success",
                    store: storeList,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Get List Store False",
                    store: storeList,
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}


let test = () => {
    console.log("abv");

}



module.export = {
    handleGetAllStore: handleGetAllStore,
    test: test

}

