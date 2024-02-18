import { UserInfo } from '@/components/user-info';
import { currentUser } from '@/lib/auth';

const ServerPage = async () => {
    const user = await currentUser();
    console.log('USER : ', user);
    return <UserInfo label="Server component" user={user} />;
};

export default ServerPage;
