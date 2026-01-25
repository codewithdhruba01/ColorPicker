declare module "*.css";

interface Document {
    startViewTransition(callback: () => Promise<void> | void): {
        ready: Promise<void>
        finished: Promise<void>
        updateCallbackDone: Promise<void>
    }
}
