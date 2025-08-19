import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';

function DashboardBreadcrumbs() {
    // lấy obj location chứa path name
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const breadCrumbNameMap = {
        admin: (
            <>
                <HomeFilled /> &nbsp;
                Administrator
            </>
        ),
        'manage-user': 'Quản lý người dùng',
        'manage-question': 'Quản lý câu hỏi',

        student: (
            <>
                <HomeFilled /> &nbsp;
                Học sinh
            </>
        ),
        'class': 'Lớp học',

         teacher: (
            <>
                <HomeFilled /> &nbsp;
                Giáo viên
            </>
        ),
        'manage-class': 'Quản lý lớp học',
        
    }



    const items = [
        {
            title: (
                <>
                    <span className="text-base">
                        {breadCrumbNameMap[pathSnippets[pathSnippets.length - 1]] || pathSnippets[pathSnippets.length - 1]}
                    </span>


                </>
            )
        },
        ...pathSnippets.map((segment, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return {
                title: (
                    <Link to={url} className='text-sm text-white'>{breadCrumbNameMap[segment] || segment}</Link>
                )
            }

        })
    ]

    return (
        <Breadcrumb separator="   " items={items} />
    );
}

export default DashboardBreadcrumbs;
