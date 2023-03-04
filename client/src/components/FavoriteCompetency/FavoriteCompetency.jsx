import imgUrl from "./imgUrl";


const FavoriteCompetency = () => {
  return (
    <>
      <div>
          <h1 className="font-bold text-3xl text-center pt-20 pb-10">Jurusan Favorit</h1>
          <div className="w-full flex flex-wrap justify-around gap-y-[30px] sm:gap-x-[50px]">
            {
              imgUrl.map((item, i) => {
                return (
                  <img src={item} alt="jurusan" className="w-[130px]"/>
                )
              })
            }
          </div>
      </div>
    </>
  )
}

export default FavoriteCompetency;