import Link from "next/link";

export const metadata = {
  title: "SceneSense — License (AGPL-3.0)",
  description:
    "GNU Affero General Public License v3.0 for SceneSense, an on-device AI camera app.",
};

export default function License() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 md:py-24">
      <Link
        href="/"
        className="mb-12 inline-block text-sm text-[#8c8c87] transition-colors hover:text-[#141414]"
      >
        &larr; back to portfolio
      </Link>

      <h1 className="mb-2 text-4xl font-bold text-[#141414] md:text-5xl">
        SceneSense
      </h1>
      <p className="mb-1 text-xl text-[#595956]">License</p>
      <p className="mb-12 text-sm text-[#8c8c87]">
        GNU Affero General Public License v3.0
      </p>

      <div className="flex flex-col gap-8 text-[17px] leading-[30px] text-[#595956]">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">Summary</h2>
          <p>
            SceneSense is licensed under the{" "}
            <strong className="text-[#141414]">
              GNU Affero General Public License v3.0 (AGPL-3.0)
            </strong>
            . This means you can view, fork, and modify the code, but any
            distributed or publicly served modifications must also be released
            under AGPL-3.0 with source code available.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            What you can do
          </h2>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>Use the software for any purpose.</li>
            <li>Study how the program works and modify it.</li>
            <li>Redistribute copies.</li>
            <li>
              Distribute copies of your modified versions to others.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Conditions
          </h2>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>
              You must include the original copyright notice and license text.
            </li>
            <li>
              Modified versions must be released under the same AGPL-3.0 license.
            </li>
            <li>
              If you run a modified version on a server that users interact with,
              you must make the source code available to those users.
            </li>
            <li>You must state changes made to the code.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Third-Party Licenses
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="border-b border-[#e5e4e0]">
                  <th className="pb-3 pr-6 font-semibold text-[#141414]">
                    Component
                  </th>
                  <th className="pb-3 pr-6 font-semibold text-[#141414]">
                    License
                  </th>
                  <th className="pb-3 font-semibold text-[#141414]">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eeea]">
                <tr>
                  <td className="py-3 pr-6">SmolVLM2</td>
                  <td className="py-3 pr-6">Apache 2.0</td>
                  <td className="py-3">
                    Vision-language model (downloaded at runtime)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">llama.cpp</td>
                  <td className="py-3 pr-6">MIT</td>
                  <td className="py-3">
                    On-device inference engine (git submodule)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Google ML Kit Translation</td>
                  <td className="py-3 pr-6">ML Kit Terms</td>
                  <td className="py-3">
                    Offline bidirectional EN-ES translation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Full License Text
          </h2>
          <p className="mb-4">
            The complete AGPL-3.0 license text is available in the{" "}
            <a
              href="https://github.com/AlbertoEJ/SceneSense/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#141414] underline transition-colors hover:text-[#4d80ff]"
            >
              project repository
            </a>
            , or you can read it at{" "}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#141414] underline transition-colors hover:text-[#4d80ff]"
            >
              gnu.org/licenses/agpl-3.0
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">Contact</h2>
          <p>
            For licensing questions, contact{" "}
            <a
              href="mailto:hola@albertoej.com"
              className="text-[#141414] underline transition-colors hover:text-[#4d80ff]"
            >
              hola@albertoej.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-16 border-t border-[#e5e4e0] pt-6 text-[13px] text-[#8c8c87]">
        &copy; 2026 Alberto Espinosa &mdash; SceneSense
      </div>
    </div>
  );
}
