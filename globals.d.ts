import Mongoose from "mongoose"

declare module globalThis {
  var mongoose: Mongoose
}
