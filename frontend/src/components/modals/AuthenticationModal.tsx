"use client"

import { useModal } from "@/hooks/useModal"
import { Dialog, Tab, Transition } from "@headlessui/react";
import { Fragment } from "react";
import SignInForm from "./authentication/SignInForm";
import SignUpForm from "./authentication/SignUpForm";
import { useUser } from "@/hooks/useUser";

export default function AuthenticationModal() {

    const { modal, isOpen, closeModal } = useModal();
    const { user } = useUser() ?? { user: null };

    return (
        <>
      <Transition appear show={modal.authentication && isOpen && !user} as={Fragment}>
        <Dialog as="div" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 z-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full text-sm max-w-sm transform overflow-hidden rounded bg-custom-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-custom-gray-100"
                  >
                    Sign in or create an account.
                  </Dialog.Title>
                  <div className="mt-4">
                  <Tab.Group>
                    <Tab.List className={`flex justify-between text-custom-gray-100`}>
             
                        <div className={`w-full bg-custom-gray-700 h-10 flex items-center justify-center`}>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <div className={`w-11/12 cursor-pointer h-5/6 rounded flex items-center justify-center outline-none ${selected && 'text-custom-gray-400 bg-custom-gray-600'}`}>
                                        <p>Sign in</p>
                                    </div>
                                )}
                            </Tab>
                        </div>
                        
                        <div className={`w-full bg-custom-gray-700 h-10 flex items-center justify-center`}>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <div className={`w-11/12 cursor-pointer h-5/6 rounded flex items-center justify-center outline-none ${selected && 'text-custom-gray-400 bg-custom-gray-600'}`}>
                                        <p>Sign up</p>
                                    </div>
                                )}
                            </Tab>
                        </div>

                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <SignInForm />
                        <p className='text-custom-gray-400 text-[10px] text-center'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                      </Tab.Panel>
                      <Tab.Panel>
                        <SignUpForm />
                      </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
                  </div>


                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
    )
}