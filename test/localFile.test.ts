/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { LocalFile } from "../src/";

describe("local file tests", () => {
  it("reads file", async () => {
    const f = new LocalFile(require.resolve("./data/test.txt"));
    const b = await f.readFile();
    expect(b.toString()).toEqual("testing\n");
  });
  it("reads file with encoding", async () => {
    const f = new LocalFile(require.resolve("./data/test.txt"));
    const fileText = await f.readFile("utf8");
    expect(fileText).toEqual("testing\n");
    const fileText2 = await f.readFile({ encoding: "utf8" });
    expect(fileText2).toEqual("testing\n");
  });
  it("reads local file", async () => {
    const f = new LocalFile(require.resolve("./data/test.txt"));
    const buf = Buffer.allocUnsafe(3);
    const bytesRead = await f.read(buf, 0, 3, 0);
    expect(buf.toString()).toEqual("tes");
    expect(bytesRead).toEqual(3);
  });
  it("reads local file clipped at the end", async () => {
    const f = new LocalFile(require.resolve("./data/test.txt"));
    const buf = Buffer.allocUnsafe(3);
    const bytesRead = await f.read(buf, 0, 3, 6);
    expect(buf.slice(0, bytesRead).toString()).toEqual("g\n");
    expect(bytesRead).toEqual(2);
  });
  it("get stat", async () => {
    const f = new LocalFile(require.resolve("./data/test.txt"));
    const ret = await f.stat();
    expect(ret.size).toEqual(8);
  });
});
