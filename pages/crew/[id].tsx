import { gql, useQuery } from '@apollo/client';
import SmallCircleProfile from 'components/common/SmallCircleProfile';
import CrewProfile from 'components/crew/CrewProfile';
import Image from 'next/image';
import { useRouter } from 'next/router';
import VacantImage from 'public/solidwhite.png';
import React from 'react';
import {
  getCrewByName,
  getCrewByNameVariables,
} from 'src/__generated__/getCrewByName';
import { SecondCategoryName } from 'src/__generated__/globalTypes';
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
        id
        nickname
        profileImg
        crewUser {
          grade
        }
      }
      posts {
        titleImg
        title
        id
        user {
          nickname
        }
      }
    }
  }
`;

const Crew = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<
    getCrewByName,
    getCrewByNameVariables
  >(GET_CREW_BY_NAME, {
    variables: {
      input: {
        name: id + '',
      },
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <main className={CrewPageStyle.container}>
      <CrewProfile
        name={data?.getCrewByName.crew.name}
        backgroundImg={data?.getCrewByName.crew.backgroundImg || VacantImage}
        profileImg={data?.getCrewByName.crew.profileImg || VacantImage}
      />

      <div className={CrewPageStyle.joinedPeopleContaier}>
        {data?.getCrewByName.users.length ? <h4>Joined People</h4> : ''}
        <ul>
          {data?.getCrewByName.users.length
            ? data?.getCrewByName.users.map((el) => (
                <SmallCircleProfile
                  key={el.id}
                  name={el.nickname}
                  profileImg={el.profileImg}
                />
              ))
            : ''}
        </ul>
      </div>
      <div className={CrewPageStyle.crewNoticeContainer}>
        <div>
          <h2>{SecondCategoryName.CREW_NOTICE}</h2>
          <ul>
            {data?.getCrewByName.posts.map((el) => (
              <li
                key={el.id}
                className={CrewPageStyle.noticeWrapper}
                onClick={() => router.push(`/post/${el.id}`)}
              >
                <div>
                  <div>
                    <Image
                      src={el.titleImg || VacantImage}
                      width="40px"
                      height="40px"
                      alt={el.title}
                    />
                  </div>
                  <span>{el.title}</span>
                </div>
                <span>{el.user.nickname}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Crew;
