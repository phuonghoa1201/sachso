import logoFooter from '../../assets/logofooter.png'
import logo from '../../assets/sachso_logo.png'
import { Link } from 'react-router-dom';
import { PhoneFilled, HomeFilled, ClockCircleFilled } from '@ant-design/icons';
function Footer() {
    return (
        <footer className='px-6 py-4 '>
            <div className='max-w-screen-xl mx-auto  px-24 grid grid-cols-2 md:grid-cols-3 '>
                <div className='flex justify-center md:justify-start'>
                    <img className="h-20" src={logoFooter} />
                </div>
                <div className='space-y-2 text-center md:text-left'>
                    <h4 className='text-gray-600 text-base text-sm'>   &nbsp;<HomeFilled /> &nbsp; 231 Nguyễn Văn Cừ - Phường 4 - Quận 5 - TP.HCM</h4>
                    <h4 className='text-gray-600 text-base text-sm'> &nbsp;<PhoneFilled /> &nbsp; (028) 73 035 556</h4>
                    <h4 className='text-gray-600 text-base text-sm'> &nbsp;<ClockCircleFilled /> &nbsp;  Thời gian làm việc (08:00 - 17:00)</h4>
                </div>
                <div className='flex flex-col items-center md:items-end'>
                    <img className='h-7' src={logo} />
                    <p>©2025  <Link to="/" className='text-violet-600'><strong>Sách số</strong></Link></p>
                </div>


            </div>

        </footer>
    );

}
export default Footer;