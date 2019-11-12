class Storage {
  constructor() {
    this.keyName = {
      anyKey: 'keyName'
    };
  }

  list() {
    return new Promise(res => {
      res(Object.keys(this.keyName));
    })
  }

  fetch(key) {
    return new Promise((res, rej) => {
      if (!this.keyName[key]) rej();

      res(this.keyName[key]);
    })
  }

  store(key, data) {
    return new Promise((res, rej) => {
      if (this.keyName[key]) rej();

      this.keyName[key] = data;
      res();
    });
  }

  destroy(key) {
    return new Promise((res, rej) => {
      if (this.keyName[key]) res();

      delete this.keyName[key];
    })
  }

  storeList(data) {
    return new Promise((res, rej) => {
      if (data.length === 0) {
        rej('Data is empty');
      }

      data.forEach(element => {
        const key = Object.keys(element)[0];
        this.keyName[key] = element[key];
      });

      res('Data is resolved');
    });
  }

  destroyStartedWith(beginningOfKey) {
    return new Promise((res, rej) => {
      Object.keys(this.keyName).forEach(key => {
        if (key.startsWith(beginningOfKey)) {
          delete this.keyName[key];
        }
      });
      res('All aims are reached');
    });
  }

  fetchInTimeOrFail(key, timeout) {
    return new Promise((res, rej) => {
      const point = new Date();
      const data = this.keyName[key];

      if (new Date() - point > timeout) {
        rej('Error');
      }

      res(data);
    });
  }


}