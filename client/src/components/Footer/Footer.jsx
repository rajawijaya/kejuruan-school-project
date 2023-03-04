import { social, support } from "./content";

const Footer = () => {
  return (
    <>
      <div className="w-full  bg-sky-900 mt-[100px] text-white p-5 sm:px-10 sm:grid sm:grid-rows-1 sm:grid-cols-2">
        <h1 className="font-bold text-2xl sm:col-start-1 sm:col-end-3">Kejuruan Schools</h1>
        {/*_________Social__________*/}
        <div className="social my-5 sm:col-start-1 sm:col-end-2">
          <h1 className="font-bold text-xl">Social</h1>
          {
            social.map((item, i) => {
            console.log(item.icon);
              return (
                <a href={item.link} className="flex gap-2 my-2 items-center w-fit" target="_blank">
                  <i class={"fa-brands " + item.icon + " text-xl"}></i>
                  <p>{item.title}</p>
                </a>
              )
            })
          }

          <a href="https://rajawijaya.showwcase.com" className="flex gap-2 items-center w-fit" target="_blank">
            <img src="./showwcase.png" alt="showwcase icon" className="w-[20px]" />
            <p>@rajawijaya</p>
          </a>
        </div>
        {/*___________Social End____________*/}
        
        
        {/*___________Support______________*/}
        <div className="support my-5 sm:col-start-2 sm:col-end-3">
          <h1 className="font-bold text-xl">Support</h1>
          {
            support.map((item, i) => {
            console.log(item.icon);
              return (
                <a href={item.link} className="flex gap-2 my-2 items-center w-fit" target="_blank">
                  <img src={item.icon} alt="support icon" className="w-[20px]" />
                  <p>{item.title}</p>
                </a>
              )
            })
          }
        </div>
        {/*___________Support End__________*/}
        
        <p className="text-center sm:col-start-1 sm:col-end-3 pt-5">Copyright &copy; 2023 At Created By Raja Wijaya</p>
      </div>
    </>
  )
}

export default Footer;