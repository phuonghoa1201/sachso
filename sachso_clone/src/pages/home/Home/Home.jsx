import banner from '../../../assets/Banner.png'
import Feature from '../Feature/Feature';
import pyramid from '../../../assets/Thap.png'
import { CheckOutlined } from '@ant-design/icons';
import Footer from '../../../components/Footer/Footer';
function Home() {
    return (
        <>
            <section className='py-8 md:py-12'>
                <div className='md:py-24 py-18 max-w-screen-lg mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0'>
                    <img src={banner} />
                    <div className='flex flex-col'>
                        <h1 className=' md: py-6 text-3xl text-blue-700 font-bold text-center'>SÁCH GIÁO KHOA TIẾNG ANH</h1>
                        <p className=' font-thin text-gray-700 text-xl'>Áp dụng phương pháp học tập khoa học mới hệ thống học trực tuyến thông minh, ứng dụng công nghệ 4.0 với trí tuệ nhân tạo. Việc áp dụng phương pháp mới này không những mang lại hiệu quả cao, tiết kiệm thời gian mà còn mang đến tính sáng tạo, tư duy độc lập, sự tìm tòi, nghiên cứu của học sinh.</p>

                    </div>

                </div>
            </section>
            <section className='px-4 md:px-24 py-4 md:py-8'>
                <h1 className='text-center text-blue-600 text-3xl py-24 font-bold'>TÍNH NĂNG NỔI BẬT</h1>
                <Feature />
            </section>
            <section className='py-8 md:py-12'>
                <div className='md:py-24 py-18 max-w-screen-lg mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0'>
                    <img src={pyramid} className='h-60' />
                    <div className='flex flex-col bg-blue-500 px-4 py-4 rounded-tl-4xl rounded-bl-4xl '>
                        <h2 className=' md: py-6 text-3xl text-white  text-center'>Phương pháp học Tiếng Anh dựa theo "Tháp học tập"</h2>
                        <ul>
                            <li className='  text-white text-base mb-6'>  &nbsp;<CheckOutlined className='text-white' />  &nbsp;
                                Hệ thống bài học được thiết kế công phu, khoa học và hấp dẫn, giúp học viên học sâu qua các chủ đề giao tiếp thông dụng</li>
                            <li className=' text-white text-base mb-6'> &nbsp;<CheckOutlined className='text-white' />  &nbsp;Giúp học viên ghi nhớ lâu những kiến thức được học thông qua trải nghiệm trực tiếp và quá trình lặp đi lặp lại nhiều lần</li>
                            <li className=' text-white text-base mb-6'> &nbsp;<CheckOutlined className='text-white' />  &nbsp;
                                Bằng việc ứng dụng hình ảnh, âm thanh, hành động và cảm xúc vào việc học từ vựng, học viên sẽ ghi nhớ từ vựng lâu hơn, hiệu quả hơn và có hứng thú hơn khi học</li>
                        </ul>
                    </div>

                </div>
            </section>
            <Footer />
        </>

    );
}
export default Home;