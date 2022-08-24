#include <bits/stdc++.h>

using namespace std;

struct node {
    int val;
    struct node *next;
};

struct node * createNode(int val) {
    struct node *nn = (struct node*)malloc(sizeof(struct node));
    nn->val = val;
    nn->next = NULL;
    return nn;
}

int main(){
    cout<<"Hello, World!\n";

    vector<int> v(5);

    for(int i=0; i<5; i++) {
        v[i] = i+1;
    }

    int a = 5;
    int b = 0;

    int c = a/b;

    cout<<"C: "<<c<<"\n";

    struct node* head = createNode(1);

    int x = head->next->val;

    cout<<x<<"\n";

    return 0;
}
