// Send updated users list to iOS
export function sendUsersToIOS(users) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.playerLedgerSync
        ) {
            // 解开 Vue Proxy，保证纯数组对象
            const plainUsers = JSON.parse(JSON.stringify(users))
            window.webkit.messageHandlers.playerLedgerSync.postMessage({ users: plainUsers })
        } else {
            console.warn('iOS handler playerLedgerSync not found')
        }
    } catch (e) {
        console.error('sendUsersToIOS error', e)
    }
}

// Send updated posts list to iOS
export function sendPostsToIOS(posts) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.postsUpdate
        ) {
            // 解开 Vue Proxy，保证纯数组对象
            const plainPosts = JSON.parse(JSON.stringify(posts))
            window.webkit.messageHandlers.postsUpdate.postMessage({ posts: plainPosts })
        } else {
            console.warn('iOS handler postsUpdate not found')
        }
    } catch (e) {
        console.error('sendPostsToIOS error', e)
    }
}

// Send updated chats list to iOS
export function sendChatsToIOS(chats) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.chatsUpdate
        ) {
            // 解开 Vue Proxy，保证纯数组对象
            const plainChats = JSON.parse(JSON.stringify(chats))
            window.webkit.messageHandlers.chatsUpdate.postMessage({ chats: plainChats })
        } else {
            console.warn('iOS handler chatsUpdate not found')
        }
    } catch (e) {
        console.error('sendChatsToIOS error', e)
    }
}

// Send updated messages list to iOS
export function sendMessagesToIOS(messages) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.messagesUpdate
        ) {
            // 解开 Vue Proxy，保证纯数组对象
            const plainMessages = JSON.parse(JSON.stringify(messages))
            window.webkit.messageHandlers.messagesUpdate.postMessage({ messages: plainMessages })
        } else {
            console.warn('iOS handler messagesUpdate not found')
        }
    } catch (e) {
        console.error('sendMessagesToIOS error', e)
    }
}

// Send updated comments list to iOS
export function sendCommentsToIOS(comments) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.commentsUpdate
        ) {
            // 解开 Vue Proxy，保证纯数组对象
            const plainComments = JSON.parse(JSON.stringify(comments))
            window.webkit.messageHandlers.commentsUpdate.postMessage({ comments: plainComments })
        } else {
            console.warn('iOS handler commentsUpdate not found')
        }
    } catch (e) {
        console.error('sendCommentsToIOS error', e)
    }
}

// Notify iOS that user logged out
export function sendLogoutToIOS(isLogout) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.accountSessionEnded
        ) {
            window.webkit.messageHandlers.accountSessionEnded.postMessage({ isDelete: isLogout })
        } else {
            console.warn('iOS handler accountSessionEnded not found')
        }
    } catch (e) {
        console.error('sendLogoutToIOS error', e)
    }
}

// Handle page back or close action
export function goBackOrClose() {
    if (window.history.state.back) {
        history.back()
    } else {
        // iOS WKWebView callback to close the page
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.close) {
            window.webkit.messageHandlers.close.postMessage({})
        } else {
            console.warn('WebKit close handler not found')
        }
    }
}

// Notify iOS to start in-app purchase
export function sendPaymentToIOS(payKey) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.payment
        ) {
            window.webkit.messageHandlers.payment.postMessage({ payKey: payKey })
            // iOS 端回调支付结果会通过 JS 调用 window[callbackName](success)
        } else {
            console.warn('iOS handler payment not found')
        }
    } catch (e) {
        console.error('sendPaymentToIOS error', e)
    }
}

// Notify iOS that page showLoading
export function sendShowLoadingToIOS(isShow) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.surfaceActivityState
        ) {
            window.webkit.messageHandlers.surfaceActivityState.postMessage({ isShow: isShow })
        } else {
            console.warn('iOS handler surfaceActivityState not found')
        }
    } catch (e) {
        console.error('sendShowLoadingToIOS error', e)
    }
}

// Notify iOS that page showToast
export function sendShowToastToIOS(toastMsg) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.surfaceNotice
        ) {
            window.webkit.messageHandlers.surfaceNotice.postMessage({ toastMsg: toastMsg })
        } else {
            console.warn('iOS handler surfaceNotice not found')
        }
    } catch (e) {
        console.error('sendShowToastToIOS error', e)
    }
}

// Handle page back or close action
export function showToLogin() {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.showToLogin
        ) {
            window.webkit.messageHandlers.showToLogin.postMessage({})
        } else {
            console.warn('iOS handler showToLogin not found')
        }
    } catch (e) {
        console.error('sendShowToLoginToIOS error', e)
    }
}

// Send new user data to iOS
export function sendNewUserDataToIOS(newUserData) {
    try {
        if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.profileDraftReady
        ) {
            window.webkit.messageHandlers.profileDraftReady.postMessage({ newUserData: newUserData })
        } else {
            console.warn('iOS handler profileDraftReady not found')
        }
    } catch (e) {
        console.error('sendNewUserDataToIOS error', e)
    }
}
