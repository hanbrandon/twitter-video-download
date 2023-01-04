import React from 'react';

const Gallery = ({ twitters }) => {
	const data = [1, 2, 3, 4, 5, 6];
	return (
		<div className="-m-1 mt-2 flex flex-wrap md:-mx-2 md:mt-12">
			{twitters.map((twitter, key) => (
				<div key={key} className="flex flex-wrap md:w-1/3 lg:w-1/4">
					<div className="w-full px-1 py-2 md:p-2">
						<img
							alt="gallery"
							className="block h-full w-full rounded-lg object-cover object-center"
							src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default Gallery;
