var publisher = {
    publish(pubsub) {
        pubsub.pushlish()
    }
}

var pubsub = {
    subscribes: [],
    publish() {
        this.subscribes.forEach(subscribe => {
            subscribe.update()
        })
    },
    subscribe(sub) {
        this.subscribes.push(sub)
    }
}

var subscribe = {
    update() {
        console.log('update')
    },
    subscribe(pubsub) {
        pubsub.subscribe(this);
    }
}

subscribe.subscribe(pubsub);
pushlisher.publish(pubsub);
// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/25