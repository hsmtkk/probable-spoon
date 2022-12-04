// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace } from "cdktf";
import * as google from '@cdktf/provider-google';

const project = 'probable-spoon-370621';
const region = 'asia-northeast1';
const repository = 'probable-spoon';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new google.provider.GoogleProvider(this, 'google', {
      project,
      region,
    });

    const my_storage = new google.storageBucket.StorageBucket(this, 'my-storage', {
      location: region,
      name: `storage-${project}`,
    });
    
    new google.cloudbuildTrigger.CloudbuildTrigger(this, 'cloudbuild-trigger', {
      filename: 'cloudbuild.yaml',
      github: {
        owner: 'hsmtkk',
        name: repository,
        push: {
          branch: 'main',
        },
      },
    });

    new google.artifactRegistryRepository.ArtifactRegistryRepository(this, 'registry', {
      format: 'docker',
      location: region,
      repositoryId: 'registry',
    });

  }
}

const app = new App();
const stack = new MyStack(app, "probable-spoon");
new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "hsmtkkdefault",
  workspaces: new NamedCloudWorkspace("probable-spoon")
});
app.synth();
