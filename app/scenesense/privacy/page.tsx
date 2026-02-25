import Link from "next/link";

export const metadata = {
  title: "SceneSense — Privacy Policy",
  description: "Privacy policy for SceneSense, an on-device AI camera app.",
};

export default function PrivacyPolicy() {
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
      <p className="mb-1 text-xl text-[#595956]">Privacy Policy</p>
      <p className="mb-12 text-sm text-[#8c8c87]">Last updated: February 2026</p>

      <div className="flex flex-col gap-10 text-[17px] leading-[30px] text-[#595956]">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">Overview</h2>
          <p>
            SceneSense is a camera app that uses on-device AI to describe scenes
            and answer questions about captured images and videos. Your privacy is
            our priority: <strong className="text-[#141414]">all processing happens locally on your device</strong>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Data Collection
          </h2>
          <p className="mb-3">
            <strong className="text-[#141414]">
              We do not collect, store, transmit, or share any personal data.
            </strong>
          </p>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>No images or videos leave your device.</li>
            <li>
              No text descriptions or chat messages are sent to external servers.
            </li>
            <li>No analytics, telemetry, or tracking of any kind.</li>
            <li>No user accounts or registration required.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Camera and Microphone
          </h2>
          <p>
            SceneSense requires camera access to capture photos and videos for
            analysis. Microphone access is used only during video recording and
            voice commands. All captured media is processed entirely on-device and
            is not transmitted anywhere.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">AI Model</h2>
          <p>
            The AI model (SmolVLM2) runs locally on your device. The model files
            are downloaded once from Hugging Face upon first launch. After
            download, no internet connection is required for the AI to function.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Translation
          </h2>
          <p>
            Translation (English to Spanish) is powered by Google ML Kit&apos;s
            on-device translation. The translation model is downloaded once and
            runs entirely offline. No text is sent to Google servers for
            translation.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Internet Usage
          </h2>
          <p className="mb-3">Internet is used only for:</p>
          <ul className="ml-5 flex list-disc flex-col gap-2">
            <li>Initial download of the AI model (~500 MB, one-time).</li>
            <li>
              Initial download of the translation model (one-time, via ML Kit).
            </li>
          </ul>
          <p className="mt-3">
            After these downloads, the app functions fully offline.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Third-Party Services
          </h2>
          <p>
            SceneSense does not integrate any third-party analytics, advertising,
            or data collection services.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Children&apos;s Privacy
          </h2>
          <p>
            SceneSense does not knowingly collect any information from children.
            The app does not collect information from anyone.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">
            Changes to This Policy
          </h2>
          <p>
            If we update this policy, the changes will be reflected on this page
            with an updated date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-[#141414]">Contact</h2>
          <p>
            If you have questions about this privacy policy, contact us at{" "}
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
