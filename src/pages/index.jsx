import { useState, Fragment, useRef } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

const navigation = [
	{ name: 'Product', href: '#' },
	{ name: 'Features', href: '#' },
	{ name: 'Marketplace', href: '#' },
	{ name: 'Company', href: '#' },
];

const Home = () => {
	const urlRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('hi');
		const response = await axios.get(
			`/api/twitter?url=${urlRef.current.value}`,
		);
		console.log(response);
	};

	return (
		<div className="relative overflow-hidden">
			<Popover as="header" className="relative">
				<div className="bg-gray-900 pt-6">
					<nav
						className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
						aria-label="Global"
					>
						<div className="flex flex-1 items-center">
							<div className="flex w-full items-center justify-between md:w-auto">
								<a href="#">
									<span className="sr-only">Your Company</span>
									<img
										className="h-8 w-auto sm:h-10"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
										alt=""
									/>
								</a>
								<div className="-mr-2 flex items-center md:hidden">
									<Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
										<span className="sr-only">Open main menu</span>
										<Bars3Icon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
							{/* <div className="hidden space-x-8 md:ml-10 md:flex">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="text-base font-medium text-white hover:text-gray-300"
									>
										{item.name}
									</a>
								))}
							</div> */}
						</div>
						<div className="hidden md:flex md:items-center md:space-x-6">
							<a
								href="#"
								className="text-base font-medium text-white hover:text-gray-300"
							>
								Log in
							</a>
							<a
								href="#"
								className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
							>
								Start free trial
							</a>
						</div>
					</nav>
				</div>

				<Transition
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel
						focus
						className="absolute inset-x-0 top-0 z-10 origin-top transform p-2 transition md:hidden"
					>
						<div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
							<div className="flex items-center justify-between px-5 pt-4">
								<div>
									<img
										className="h-8 w-auto"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
										alt=""
									/>
								</div>
								<div className="-mr-2">
									<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
							<div className="pt-5 pb-6">
								<div className="space-y-1 px-2">
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
										>
											{item.name}
										</a>
									))}
								</div>
								<div className="mt-6 px-5">
									<a
										href="#"
										className="block w-full rounded-md bg-indigo-600 py-3 px-4 text-center font-medium text-white shadow hover:bg-indigo-700"
									>
										Start free trial
									</a>
								</div>
								<div className="mt-6 px-5">
									<p className="text-center text-base font-medium text-gray-500">
										Existing customer?{' '}
										<a href="#" className="text-gray-900 hover:underline">
											Login
										</a>
									</p>
								</div>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>

			<main>
				<div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
					<div className="mx-auto max-w-7xl lg:px-8">
						<div className="lg:grid lg:grid-cols-1 lg:gap-8">
							<div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
								<div className="lg:py-24">
									<h1 className="mt-4 text-center text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
										<span className="block">Download</span>
										<span className=" text-[#00acee]">Twitter</span>
										<span className=""> Video</span>
									</h1>
									<p className="mt-3 text-center text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
										Copy a Twitter video's URL and paste it into our downloader.
										Click "Download" and the video will open in a new tab.
										Right-click on the video and select "Save video as" to
										download it to your computer
									</p>
									<div className="mt-10 sm:mt-12">
										<form
											onSubmit={handleSubmit}
											className="sm:mx-auto sm:max-w-xl lg:mx-auto"
										>
											<div className="sm:flex">
												<div className="min-w-0 flex-1">
													<label htmlFor="url" className="sr-only">
														Twitter video URL
													</label>
													<input
														id="url"
														ref={urlRef}
														type="text"
														placeholder="Enter twitter video URL"
														className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
													/>
												</div>
												<div className="mt-3 sm:mt-0 sm:ml-3">
													<button
														type="submit"
														className="block w-full rounded-md bg-indigo-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
													>
														Download
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* More main page content here... */}
			</main>
		</div>
	);
};

export default Home;
