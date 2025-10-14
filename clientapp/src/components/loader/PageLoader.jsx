import LoaderVideo from './LoaderVideo'

const PageLoader = ({
   isLoading = false
}) => {


   if(!isLoading){
      return
   }

   
   
   return (
      <div className='page-loader-c'>
         <LoaderVideo />
      </div>
   )
}

export default PageLoader