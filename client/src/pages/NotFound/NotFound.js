import React from "react";
import { Link } from "react-router-dom";
import * as S from "./style";
import Text from "../../components/Text";

function NotFound() {
    return (
        <S.Content>
            <S.Header>
                <Text size="64px" bold>
                    Page Not Found
                </Text>
            </S.Header>
            <Link exact to="/">
                Back to Home
            </Link>
        </S.Content>
    );
}

export default NotFound;
