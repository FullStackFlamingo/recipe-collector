import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

type props = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

export default function DialogMainNavigation(props: props) {
  const { t } = useTranslation();
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full">
            <Transition.Child
              as={Fragment}
              enter="transform ease-out duration-300"
              enterFrom="opacity-0 -translate-x-full"
              enterTo="opacity-100"
              leave="transform ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 -translate-x-full"
            >
              <Dialog.Panel className="w-72 transform overflow-hidden rounded-tr-2xl rounded-br-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="flex items-center text-lg font-medium leading-6 text-gray-900">
                  <span className="flex-1">Title</span>
                  <button
                    className="flex items-center"
                    aria-label={t('mainNavigation.close')}
                    onClick={() => props.onClose(false)}
                  >
                    <XMarkIcon className="w-12 p-2" aria-hidden />
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Message</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
