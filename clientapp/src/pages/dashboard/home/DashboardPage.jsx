import { useNavigate } from 'react-router-dom'
import Button from '../../../components/custom/Button'
import TableUserList from '../../../components/dashboard/home/TableUserList'
import PageTitleContainer from '../../../components/common/PageTitleContainer';
import { useLoginData } from '../../../redux/features/login/loginSlice';

const DashboardPage = () => {

  const { company = {} } = useLoginData();
  const { company_name = '' } = company;

  const navigate = useNavigate();
  

  return (
    <div className='dashboard-page'>

      <PageTitleContainer 
        title="Dashboard"
        description={company_name}
        rightSide={
          <>
            <Button
              onClick={() => navigate('/dashboard/register-from-store')}
            >
              Register from Store
            </Button>
          </>
        }
      />



      <TableUserList />
    </div>
  )
}

export default DashboardPage