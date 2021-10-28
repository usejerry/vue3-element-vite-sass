

// 我的申请
export function statefilter(state) {
    let data_text = {'ing':'待审核','succ':"同意",'fail':"不同意"}
    return data_text[state]
}

// 我的审批
export function statefilter2(state) {
    let data_text = {'ing':'待审核','succ':"同意",'fail':"不同意"}
    return data_text[state]
}

// 风险判定
export function fxfilter(state) {
    let data_text = {0:'有风险',1:"正常",2:"失控"}
    return data_text[state]
}

// 稿件状态
export function manuscriptfilter(state) {
    let data_text = {process:'过程稿',final:"终稿",null:"无状态"}
    return data_text[state]
}

