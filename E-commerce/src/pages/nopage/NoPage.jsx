import Layout from "../../components/layout/Layout";

function NoPage(){
    return <>
    <Layout>
    {/* <div>Not found</div> */}
    <div className="flex justify-center items-center m-4">
    <img className="w-1/2 h-[20%]" src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1703203200&semt=ais" alt="no page img"/>
    </div>
    </Layout>
    </>
}

export default NoPage;