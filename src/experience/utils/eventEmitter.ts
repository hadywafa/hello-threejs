type Callback = (...args: any[]) => any;

interface Callbacks {
  [namespace: string]: {
    [eventName: string]: Callback[];
  };
}

interface ResolvedName {
  original: string;
  value: string;
  namespace: string;
}

export default class EventEmitter {
  private callbacks: Callbacks;

  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }

  private resolveNames(_names: string): string[] {
    let names = _names.replace(/[^a-zA-Z0-9 ,/.]/g, "");
    names = names.replace(/[,/]+/g, " ");
    return names.split(" ");
  }

  private resolveName(name: string): ResolvedName {
    const newName: ResolvedName = {
      original: name,
      value: "",
      namespace: "base", // Base namespace
    };

    const parts = name.split(".");

    newName.value = parts[0];

    // Specified namespace
    if (parts.length > 1 && parts[1] !== "") {
      newName.namespace = parts[1];
    }

    return newName;
  }

  on(_names: string, callback: Callback): this {
    // Errors
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong names");
      return this;
    }

    if (typeof callback === "undefined") {
      console.warn("wrong callback");
      return this;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name);

      // Create namespace if not exist
      if (!(this.callbacks[name.namespace] instanceof Object)) {
        this.callbacks[name.namespace] = {};
      }

      // Create callback if not exist
      if (!(this.callbacks[name.namespace][name.value] instanceof Array)) {
        this.callbacks[name.namespace][name.value] = [];
      }

      // Add callback
      this.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  off(_names: string): this {
    // Errors
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong name");
      return this;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name);

      // Remove namespace
      if (name.namespace !== "base" && name.value === "") {
        delete this.callbacks[name.namespace];
      } else {
        // Remove specific callback in namespace
        if (name.namespace === "base") {
          // Try to remove from each namespace
          for (const namespace in this.callbacks) {
            if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
              delete this.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(this.callbacks[namespace]).length === 0) {
                delete this.callbacks[namespace];
              }
            }
          }
        } else if (
          this.callbacks[name.namespace] instanceof Object &&
          this.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete this.callbacks[name.namespace][name.value];

          // Remove namespace if empty
          if (Object.keys(this.callbacks[name.namespace]).length === 0) {
            delete this.callbacks[name.namespace];
          }
        }
      }
    });

    return this;
  }

  trigger(_name: string, _args: any[] = []): any {
    // Errors
    if (typeof _name === "undefined" || _name === "") {
      console.warn("wrong name");
      return false;
    }

    let finalResult: any = null;
    let result: any = null;

    // Resolve names (should only have one event)
    const names = this.resolveNames(_name);

    // Resolve name
    const name = this.resolveName(names[0]);

    // Default namespace
    if (name.namespace === "base") {
      // Try to find callback in each namespace
      for (const namespace in this.callbacks) {
        if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
          this.callbacks[namespace][name.value].forEach((callback) => {
            result = callback.apply(this, _args);

            if (typeof finalResult === "undefined") {
              finalResult = result;
            }
          });
        }
      }
    } else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === "") {
        console.warn("wrong name");
        return this;
      }

      this.callbacks[name.namespace][name.value].forEach((callback) => {
        result = callback.apply(this, _args);

        if (typeof finalResult === "undefined") {
          finalResult = result;
        }
      });
    }

    return finalResult;
  }
}
