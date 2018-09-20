# Button with icon

## Icon inline

```twig
<a class="primary button with--inline-icon with--add-icon" href="#"><i></i><span>Link text</span></a>
<button class="primary button with--inline-icon with--add-icon"><i></i><span>Button text</span></button>
```

``scss
.button {
	&.with--inline-icon {
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		padding: 0;
		border: none;
		i {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex: 0 0 rem-calc(44px);
			border-right: 1px solid $white;
			&::after {
				display: inline-block;
				content: '';
				background-size: rem-calc(12px) rem-calc(15px);
				vertical-align: middle; // without this, the line doesn't meet the bottom of the container. ¯\_(ツ)_/¯
			}
		}
		span {
			flex: 1 0 auto;
			margin-left: auto;
			white-space: nowrap;
			padding: $button-padding;
		}
		&.mod-reverse {
			flex-direction: row-reverse;
			i {
				border-right: none;
				border-left: 1px solid $white;
			}
		}
		&.with--add-icon {
			i::after {
				@include pseudoicon('../images/options-delete.svg', rem-calc(20px), rem-calc(20px));
			}
		}
	}
}
```
