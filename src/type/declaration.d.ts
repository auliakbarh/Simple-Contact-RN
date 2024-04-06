declare type HOC<props = unknown> = (
  component: React.FC<props>,
) => (props: props) => React.ReactElement;

declare type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property]
}
