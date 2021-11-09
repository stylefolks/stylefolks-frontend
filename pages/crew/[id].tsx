import { gql, useQuery } from '@apollo/client';
import {
  pickFirstCategoryVar,
  writtenPostVar,
} from 'cache/common/common.cache';
import { Button } from 'components/common/Button';
import CrewProfile from 'components/crew/CrewProfile';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCrewByName,
  getCrewByNameVariables,
} from 'src/__generated__/getCrewByName';
import {
  FirstCategoryName,
  SecondCategoryName,
} from 'src/__generated__/globalTypes';
import { RootState } from 'store/modules';
import CrewPageStyle from 'styles/crew/CrewPage.module.scss';

const GET_CREW_BY_NAME = gql`
  query getCrewByName($input: GetCrewByNameInput!) {
    getCrewByName(input: $input) {
      ok
      error
      crew {
        profileImg
        name
        Introduction
        backgroundImg
      }
      users {
        nickname
      }
    }
  }
`;

const Crew = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { post, pickTempId, isModify, modifyPostId } = useSelector(
    (state: RootState) => state.upload
  );
  const { id } = router.query;
  console.log(id);
  const { data, loading, error } = useQuery<
    getCrewByName,
    getCrewByNameVariables
  >(GET_CREW_BY_NAME, {
    variables: {
      input: {
        name: id as string,
      },
    },
  });

  const goWirteCrewPost = () => {
    pickFirstCategoryVar(FirstCategoryName.CREW);
    writtenPostVar({
      ...post,
      firstCategoryName: FirstCategoryName.CREW,
    });

    router.push('/upload');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className={CrewPageStyle.container}>
      <CrewProfile
        name={data.getCrewByName.crew.name}
        backgroundImg={data.getCrewByName.crew.backgroundImg}
        profileImg={data.getCrewByName.crew.profileImg}
      />
      <div>{data?.getCrewByName?.crew.name}</div>
      <div>
        <span>Joined Person</span>
        {data.getCrewByName.users.map((el, index) => (
          <div key={index}>{el.nickname}</div>
        ))}
      </div>
      <div>
        <div>
          <h2>{SecondCategoryName.NOTICE} </h2>
          <Button
            actionText="글쓰기"
            onClick={() => goWirteCrewPost()}
            loading={false}
            canClick
          />
        </div>
      </div>
    </main>
  );
};

export default Crew;
