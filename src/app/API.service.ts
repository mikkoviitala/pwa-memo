/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateMemoInput = {
  id?: string | null;
  name: string;
  description?: string | null;
  date?: string | null;
};

export type ModelMemoConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  date?: ModelStringInput | null;
  and?: Array<ModelMemoConditionInput | null> | null;
  or?: Array<ModelMemoConditionInput | null> | null;
  not?: ModelMemoConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateMemoInput = {
  id: string;
  name?: string | null;
  description?: string | null;
  date?: string | null;
};

export type DeleteMemoInput = {
  id?: string | null;
};

export type ModelMemoFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  date?: ModelStringInput | null;
  and?: Array<ModelMemoFilterInput | null> | null;
  or?: Array<ModelMemoFilterInput | null> | null;
  not?: ModelMemoFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type CreateMemoMutation = {
  __typename: "Memo";
  id: string;
  name: string;
  description: string | null;
  date: string | null;
  owner: string | null;
};

export type UpdateMemoMutation = {
  __typename: "Memo";
  id: string;
  name: string;
  description: string | null;
  date: string | null;
  owner: string | null;
};

export type DeleteMemoMutation = {
  __typename: "Memo";
  id: string;
  name: string;
  description: string | null;
  date: string | null;
  owner: string | null;
};

export type GetMemoQuery = {
  __typename: "Memo";
  id: string;
  name: string;
  description: string | null;
  date: string | null;
  owner: string | null;
};

export type ListMemosQuery = {
  __typename: "ModelMemoConnection";
  items: Array<{
    __typename: "Memo";
    id: string;
    name: string;
    description: string | null;
    date: string | null;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateMemoSubscription = {
  __typename: "Memo";
  id: string;
  name: string;
  description: string | null;
  date: string | null;
  owner: string | null;
};

export type OnUpdateMemoSubscription = {
  __typename: "Memo";
  id: string;
  name: string;
  description: string | null;
  date: string | null;
  owner: string | null;
};

export type OnDeleteMemoSubscription = {
  __typename: "Memo";
  id: string;
  name: string;
  description: string | null;
  date: string | null;
  owner: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateMemo(
    input: CreateMemoInput,
    condition?: ModelMemoConditionInput
  ): Promise<CreateMemoMutation> {
    const statement = `mutation CreateMemo($input: CreateMemoInput!, $condition: ModelMemoConditionInput) {
        createMemo(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          date
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMemoMutation>response.data.createMemo;
  }
  async UpdateMemo(
    input: UpdateMemoInput,
    condition?: ModelMemoConditionInput
  ): Promise<UpdateMemoMutation> {
    const statement = `mutation UpdateMemo($input: UpdateMemoInput!, $condition: ModelMemoConditionInput) {
        updateMemo(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          date
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMemoMutation>response.data.updateMemo;
  }
  async DeleteMemo(
    input: DeleteMemoInput,
    condition?: ModelMemoConditionInput
  ): Promise<DeleteMemoMutation> {
    const statement = `mutation DeleteMemo($input: DeleteMemoInput!, $condition: ModelMemoConditionInput) {
        deleteMemo(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          date
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMemoMutation>response.data.deleteMemo;
  }
  async GetMemo(id: string): Promise<GetMemoQuery> {
    const statement = `query GetMemo($id: ID!) {
        getMemo(id: $id) {
          __typename
          id
          name
          description
          date
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMemoQuery>response.data.getMemo;
  }
  async ListMemos(
    filter?: ModelMemoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListMemosQuery> {
    const statement = `query ListMemos($filter: ModelMemoFilterInput, $limit: Int, $nextToken: String) {
        listMemos(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            description
            date
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListMemosQuery>response.data.listMemos;
  }
  OnCreateMemoListener: Observable<OnCreateMemoSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateMemo($owner: String!) {
        onCreateMemo(owner: $owner) {
          __typename
          id
          name
          description
          date
          owner
        }
      }`
    )
  ) as Observable<OnCreateMemoSubscription>;

  OnUpdateMemoListener: Observable<OnUpdateMemoSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateMemo($owner: String!) {
        onUpdateMemo(owner: $owner) {
          __typename
          id
          name
          description
          date
          owner
        }
      }`
    )
  ) as Observable<OnUpdateMemoSubscription>;

  OnDeleteMemoListener: Observable<OnDeleteMemoSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteMemo($owner: String!) {
        onDeleteMemo(owner: $owner) {
          __typename
          id
          name
          description
          date
          owner
        }
      }`
    )
  ) as Observable<OnDeleteMemoSubscription>;
}
