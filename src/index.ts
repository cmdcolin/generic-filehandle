import * as url from "url";
import {LocalFile} from "./localFile";
import {RemoteFile} from "./remoteFile";

function fromUrl(source): FileHandle {
  const { protocol, pathname } = url.parse(source);
  if (protocol === "file:") {
    return new LocalFile(unescape(pathname));
  }
  return new RemoteFile(source);
}
function open(
  maybeUrl?: string,
  maybePath?: string,
  maybeFilehandle?: Filehandle
): Filehandle {
  if (maybeFilehandle) return maybeFilehandle;
  if (maybeUrl) return fromUrl(maybeUrl);
  if (maybePath) return new LocalFile(maybePath);
  throw new Error("no url, path, or filehandle provided, cannot open");
}

export {open, fromUrl, RemoteFile, LocalFile}
