import { StarterKit } from "@tiptap/starter-kit";

// tiptap extensions
import FileHandler from "@tiptap-pro/extension-file-handler";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import html from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";

//custom extensions
import { ImageDeletion } from "../custom-extension/ImageComponent";

//lowlight configurations
const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("javascript", javascript);
lowlight.register("css", css);
lowlight.register("python", python);
lowlight.register("java", java);
lowlight.register("cpp", cpp);
lowlight.register("go", go);
lowlight.register("rust", rust);

// extensions configurations
const extensions = [
  StarterKit.configure({
    orderedList: true,
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  ImageDeletion,
  Underline,
  Image.configure({
    inline: true,
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Link.configure({
    openOnClick: true,
    autolink: true,
    linkOnPaste: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains

        // all checks have passed
        return true;
      } catch (error) {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);
      } catch (error) {
        return false;
      }
    },
  }),

  FileHandler.configure({
    allowedMimeTypes: ["image/jpeg", "image/png", "image/gif"],
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    onDrop: (currentEditor, files, pos) => {
      if (!files || files.length === 0) return;

      const file = files[0]; // Assuming single file handling here
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const src = fileReader.result;
        currentEditor
          .chain()
          .focus()
          .insertContent({
            type: "imageDeletion",
            attrs: {
              src: src,
              alt: "image",
              id: 1,
            },
          })
          .run();
      };

      fileReader.onerror = () => {
        console.error("Failed to read file:", fileReader.error);
      };

      fileReader.readAsDataURL(file);
    },

    onPaste: (currentEditor, files, htmlContent) => {
      files.forEach((file) => {
        if (htmlContent) {
          // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
          // you could extract the pasted file from this url string and upload it to a server for example
          return false;
        }

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .focus()
            .insertContent({
              type: "imageDeletion",
              attrs: {
                src: fileReader.result,
                alt: "image",
                id: "1",
              },
            })
            .run();
        };
      });
    },
  }),
];

export default extensions













