import React from 'react';
import { AlertCircle, Mail, BookOpen } from 'lucide-react'; // Optional: npm install lucide-react

const ScaleUsageNotice = () => {
  return (
    <div className="mx-auto my-8 max-w-4xl overflow-hidden rounded-lg border-l-4 border-blue-600 bg-white shadow-md">
      <div className="p-6">
        <div className="mb-4 flex items-center text-blue-600">
          <AlertCircle className="mr-2 h-6 w-6" />
          <h2 className="text-xl font-bold uppercase tracking-wide">
            Usage Notice / ব্যবহারের নির্দেশিকা
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* English Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-1 text-lg font-semibold text-gray-800">
              English
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>
                  This scale <strong>cannot be used</strong> without explicit
                  permission from the validator and the author.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>
                  <strong>No Commercial Use:</strong> This scale is intended
                  strictly for academic and research purposes only.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>
                  To obtain permission, please contact the{' '}
                  <strong>corresponding author</strong> via email.
                </span>
              </li>
              <li className="flex items-center gap-2 pt-2 text-blue-700">
                <Mail className="h-4 w-4" />
                <span>
                  Enquiries:{' '}
                  <a
                    href="mailto:admin@prabd.org"
                    className="font-medium underline"
                  >
                    admin@prabd.org
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Bangla Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-1 text-lg font-semibold text-gray-800">
              বাংলা
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>
                  ভ্যালিডেটর এবং লেখকের <strong>পূর্ব অনুমতি ব্যতীত</strong> এই
                  স্কেলটি ব্যবহার করা যাবে না।
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>
                  <strong>অবাণিজ্যিক ব্যবহার:</strong> এটি শুধুমাত্র একাডেমিক
                  এবং গবেষণামূলক কাজের জন্য প্রযোজ্য। কোনো বাণিজ্যিক উদ্দেশ্যে
                  ব্যবহার নিষিদ্ধ।
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>
                  অনুমতির জন্য অনুগ্রহ করে সংশ্লিষ্ট লেখকের সাথে ইমেলের মাধ্যমে
                  যোগাযোগ করুন।
                </span>
              </li>
              <li className="flex items-center gap-2 pt-2 text-blue-700">
                <Mail className="h-4 w-4" />
                <span>
                  জিজ্ঞাসা বা অভিযোগ:{' '}
                  <a
                    href="mailto:admin@prabd.org"
                    className="font-medium underline"
                  >
                    admin@prabd.org
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center border-t border-gray-100 pt-4 text-center text-xs italic text-gray-500">
          <BookOpen className="mr-1 h-3 w-3" />
          Dedicated to advancing psychiatric research in Bangladesh
        </div>
      </div>
    </div>
  );
};

export default ScaleUsageNotice;
