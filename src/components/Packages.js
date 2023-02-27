import React from 'react';

const Packages = props => (
  <div className="gray-background pt-4 pb-5">
    <div className="text-center pt-5 pb-3 pb-4 main-text">MOST POPULAR PACKAGES</div>
    <div className="row packages">
      <div className="col-sm-4 text-center p-0">
        <div className="bg-white package">
          <img
            src="https://meijiacademy.com/wp-content/uploads/2018/06/packages-01-e1528617873689.png"
            alt="package1"
            width="100%"
            onClick={() => props.onChoosePackage(0)}
            className="pointer"
          />
          <div className="package-text pr-2 my-2">
            CRASH COURSE NIPPON <br /> (2 weeks)
          </div>
          <ul className="package-feature text-left pr-2 my-2">
            <li>Recommended for complete Beginers</li>
            <li>More info: <a href="https://meijiacademy.com/packages/">Click Here</a></li>
          </ul>
          <button className="btn btn-add mt-2 mb-4" type="button" onClick={() => props.onChoosePackage(0)}>
            Select
          </button>
        </div>
      </div>
      <div className="col-sm-4 text-center p-0">
        <div className="bg-white package">
          <img
            src="https://meijiacademy.com/wp-content/uploads/2018/06/packages-02-e1528617892969.png"
            alt="package2"
            width="100%"
            onClick={() => props.onChoosePackage(1)}
            className="pointer"
          />
          <div className="package-text pr-2 my-2">
            MASTER JAPANESE <br /> (4 weeks)
          </div>
          <ul className="package-feature text-left pr-2 my-2">
            <li>Make the Most out of your Time</li>
            <li>More info: <a href="https://meijiacademy.com/packages/">Click Here</a></li>
          </ul>
          <button className="btn btn-add mt-2 mb-4" type="button" onClick={() => props.onChoosePackage(1)}>
            Select
          </button>
        </div>
      </div>
      <div className="col-sm-4 text-center p-0">
        <div className="bg-white package">
          <img
            src="https://meijiacademy.com/wp-content/uploads/2018/12/packages-04-e1545043183340.png"
            alt="package3"
            width="100%"
            onClick={() => props.onChoosePackage(2)}
            className="pointer"
          />
          <div className="package-text pr-2 my-2">
            SPRING PROGRAM <br /> (4 weeks)
          </div>
          <ul className="package-feature text-left pr-2 my-2">
            <li>Discover Japan’s Seasonal Delights</li>
            <li>More info: <a href="https://meijiacademy.com/packages/">Click Here</a></li>
          </ul>
          <button className="btn btn-add mt-2 mb-4" type="button" onClick={() => props.onChoosePackage(2)}>
            Select
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Packages;
