var subject = {
    observers: [],
    notify() {
        this.observers.forEach(observer => {
            observer.update();
        })
    },
    attact(observer) {
        this.observers.push(observer)
    }
}

var observer = {
    update() {
        console.log('updated')
    }
}

subject.attact(observer);
subject.notify();