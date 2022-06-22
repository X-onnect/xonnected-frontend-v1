import * as S from './styles';
import { Hamburger } from './Hamburger';

const Navbar = () => {
    return (
        <S.NavbarWrapper>
            <Hamburger />
            
            <S.LogoText>
                X-onnect
            </S.LogoText>
        </S.NavbarWrapper>
    )
}

export { Navbar };